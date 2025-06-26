# Railway Deployment Troubleshooting

## Node.js Version Issues

### Problem: Railway uses Node.js v18 instead of v20+
**Solution:** Multiple version enforcement methods implemented:

1. **`.nixpacks.toml`** - Forces Node.js 20 in Nixpacks builder
2. **`.nvmrc`** - NVM version specification  
3. **`.node-version`** - Additional version hint
4. **`package.json engines`** - Engine requirements in all workspace packages
5. **`railway.json`** - Custom build commands

### Problem: Postinstall script recursion/timeouts
**Solution:** Replaced `postinstall` with `railway:install`:

```json
{
  "scripts": {
    "railway:install": "npm install --workspace=apps/backend && npm install --workspace=apps/frontend"
  }
}
```

## Build Process

### Railway Build Command
```bash
npm run railway:install && npm run build
```

### Local Testing
```bash
# Test the exact Railway build process
npm run railway:install
npm run build
npm start
```

## Environment Variables

Required on Railway:
- `NODE_ENV=production`
- `PORT` (auto-set by Railway)

## Troubleshooting Steps

1. **Check Node.js version in Railway logs:**
   ```bash
   node --version
   ```

2. **Verify build output:**
   - Backend dist/ folder created
   - Frontend dist/ folder created

3. **Test locally with production build:**
   ```bash
   NODE_ENV=production npm start
   ```

4. **Railway deployment commands:**
   ```bash
   # Force redeploy
   railway up --detach

   # Check logs
   railway logs

   # Check service status
   railway status
   ```

## Common Issues & Solutions

### Issue: "Cannot find module" errors
**Solution:** Ensure all dependencies are in the correct package.json

### Issue: Build timeouts
**Solution:** Optimized install process with workspace-specific installs

### Issue: TypeScript compilation errors
**Solution:** Check tsconfig.json compatibility with Node.js 20+

### Issue: Vite build failures
**Solution:** Ensure all frontend dependencies are compatible

## Performance Optimizations

1. **Reduced build time:** Separate workspace installs
2. **Smaller container:** Node.js Alpine base
3. **Efficient caching:** Proper dependency management

## Latest Fixes Applied

- ✅ Removed recursive postinstall script
- ✅ Added Node.js 20+ enforcement files
- ✅ Updated Dockerfile to Node.js 20
- ✅ Optimized Railway build process
- ✅ Added comprehensive version checks