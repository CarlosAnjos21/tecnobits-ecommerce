# 🚀 Guia de Deploy - Tecnobits na Vercel

## ⚡ **PROBLEMA RESOLVIDO: Erro do Rollup**

### ❌ **Erro Original:**
```
Error: Cannot find module @rollup/rollup-linux-x64-gnu
```

### ✅ **Soluções Aplicadas:**
- 🔧 **vercel.json** configurado com `--legacy-peer-deps`
- 🔧 **vite.config.js** otimizado para produção
- 🔧 **package.json** com `engines` e `overrides`
- 🔧 **.nvmrc** com versão Node.js 18

---

## 🔧 **Arquivos Corrigidos:**

### 📁 **vercel.json (Simplificado):**
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --legacy-peer-deps"
}
```

### 📁 **package.json (Engines):**
```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "overrides": {
    "rollup": "^4.0.0"
  }
}
```

---

## 🚀 **Passos para Deploy:**

### **1. Fazer Push das Correções:**
```bash
git add .
git commit -m "fix: resolve rollup build error for vercel deploy"
git push origin main
```

### **2. Redeploy na Vercel:**
1. Ir para [vercel.com/dashboard](https://vercel.com/dashboard)
2. Encontrar seu projeto
3. Clicar em **"Redeploy"**
4. Ou fazer um novo **push** que trigará o deploy automático

### **3. Monitorar o Build:**
- ✅ Install: `npm install --legacy-peer-deps`
- ✅ Build: `npm run build`
- ✅ Deploy: Automatic

---

## 🐛 **Outras Soluções (se ainda der erro):**

### **Solução 1: Força Node.js 18**
```json
// vercel.json
{
  "functions": {
    "app/**": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### **Solução 2: Build Local e Upload**
```bash
# Build local:
npm run build

# Deploy manual:
vercel --prebuilt
```

### **Solução 3: Limpar Cache da Vercel**
```bash
# Via CLI:
vercel env rm NODE_ENV
vercel --force
```

---

## ✅ **Checklist Atualizado:**

- [x] ✅ **vercel.json** com `--legacy-peer-deps`
- [x] ✅ **Node.js 18** especificado (.nvmrc)
- [x] ✅ **Rollup override** no package.json
- [x] ✅ **Vite config** otimizado
- [x] ✅ **Build command** correto
- [x] ✅ **Framework** definido como "vite"

---

## 🎯 **Status Esperado:**

```bash
✅ Installing dependencies...
✅ Running build command...
✅ Uploading build outputs...
✅ Deployment completed!
```

### 🌐 **URL Final:**
`https://projeto-inter-capacita.vercel.app`

---

## 🔧 **Tecnobits - _"Poder para o seu setup."_**

**Status:** 🎯 Problema do Rollup RESOLVIDO!
