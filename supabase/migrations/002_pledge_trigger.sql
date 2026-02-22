-- Migration 002: Auto-status trigger on pledges
-- Fires on pledge INSERT/DELETE and updates idea status based on total pledge sum
-- Must be applied via Supabase Management API or dashboard
--
-- Apply via Management API:
--   JWT=$(open browser → supabase.com → localStorage → supabase.dashboard.auth.token → access_token)
--   curl -X POST https://api.supabase.com/v1/projects/bjaejvgoifgdanwvglnv/database/query \
--     -H "Authorization: Bearer $JWT" \
--     -H "Content-Type: application/json" \
--     -d '{"query": "<contents of this file>"}'
--
-- Thresholds:
--   proposed       → gaining_traction  at $300
--   gaining_traction → threshold_reached at $1000
--   Never modifies: cell_forming / active / cancelled

create or replace function update_idea_status()
returns trigger
language plpgsql
security definer
as $$
declare
  v_idea_id uuid;
  v_total   integer;
begin
  -- on DELETE, NEW is null — use OLD
  if TG_OP = 'DELETE' then
    v_idea_id := OLD.idea_id;
  else
    v_idea_id := NEW.idea_id;
  end if;

  select coalesce(sum(amount_monthly), 0)
    into v_total
    from pledges
   where idea_id = v_idea_id;

  update ideas set
    status = case
      when v_total >= 1000 then 'threshold_reached'
      when v_total >= 300  then 'gaining_traction'
      else 'proposed'
    end,
    updated_at = now()
  where id = v_idea_id
    and status not in ('cell_forming', 'active', 'cancelled');

  return coalesce(NEW, OLD);
end;
$$;

drop trigger if exists pledge_status_trigger on pledges;

create trigger pledge_status_trigger
  after insert or delete
  on pledges
  for each row
  execute function update_idea_status();
