# QA Playbook

how to verify destroysass.ai is working correctly after every deploy.

## setup

the live app is at: **https://destroysass.vercel.app**

to access it via browser automation:
1. ara must have a chrome tab open to destroysass.vercel.app
2. the openclaw browser relay extension must be active on that tab (badge = ON)
3. then use the browser tool with `profile="chrome"` and the targetId

if no tab is attached, navigate using `profile="openclaw"` (isolated browser, not logged in).

---

## after every feature deploy

### step 1: get the tab

```
browser(action="tabs", profile="chrome")
```

if no destroysass tab is attached, ask ara to open one and click the relay icon.

as a fallback:
```
browser(action="open", profile="openclaw", targetUrl="https://destroysass.vercel.app")
```

### step 2: snapshot the page

```
browser(action="snapshot", profile="chrome", targetId=<id>)
```

check:
- page loads (not a 404 or 500)
- no vercel error overlay
- layout renders correctly

### step 3: check the browser console for errors

```
browser(action="console", profile="chrome", targetId=<id>)
```

look for: uncaught errors, failed network requests (4xx/5xx), missing env var warnings.

### step 4: take a screenshot for the record

```
browser(action="screenshot", profile="chrome", targetId=<id>)
```

save it to `bny/screenshots/YYYY-MM-DD-<feature>.png` as a deploy artifact.

---

## feature-specific QA checklists

as features ship, append a section here. template:

```markdown
### <feature name>

**url:** /path/to/feature
**what to verify:**
- [ ] loads without errors
- [ ] does X
- [ ] does Y
- [ ] error state: what happens when Z fails?
```

---

## current feature QA checklists

### homepage

**url:** /
**what to verify:**
- [ ] page loads (200)
- [ ] "sign in" link visible in top-right for anonymous visitors
- [ ] no console errors

### auth

**url:** /auth
**what to verify:**
- [ ] sign in form renders
- [ ] can sign up with a test email
- [ ] after sign in: shows email + "sign out" button
- [ ] after sign out: redirects back to / 
- [ ] sign out button works

---

## vercel deployment

check deployment status:
```
exec: vercel ls --prod 2>&1 | head -10
```

check build logs if something looks broken:
```
exec: vercel logs destroysass.vercel.app 2>&1 | tail -30
```

force a re-deploy if needed:
```
exec: cd ~/gh/ahoward/destroysass && vercel deploy --prod --yes
```

---

## supabase health

check the api is responding:
```
exec: curl -s -o /dev/null -w "%{http_code}" \
  "https://bjaejvgoifgdanwvglnv.supabase.co/rest/v1/" \
  -H "apikey: <anon_key>"
```

should return 200.

---

## escalation

if something is broken and can't be diagnosed:
1. check vercel build logs first
2. check supabase dashboard for auth/db errors  
3. ask gemini via browser: gemini.google.com — it has ara's full context and may know
   if there's a relevant recent change or issue
4. surface to ara directly if still stuck after 3 attempts
