-- migration: 012_ghost_group
-- description: create the ghost group for synthetic bootstrap users

insert into groups (name, description)
values ('ghost', 'synthetic bootstrap users — pledges skip payment when stripe goes live')
on conflict (name) do nothing;
