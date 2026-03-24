import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { supabase } from './src/lib/supabaseClient.js'

const prisma = new PrismaClient()

async function migrate() {
  console.log('🔄 Exportando categorias...')
  const cats = await prisma.category.findMany()
  
  if (cats.length > 0) {
    const { error } = await supabase.from('categories').upsert(cats)
    if (error) console.error('Erro categorias:', error.message)
    else console.log(`✅ ${cats.length} categorias migradas!`)
  }

  console.log('🔄 Exportando produtos...')
  const prods = await prisma.product.findMany()
  
  if (prods.length > 0) {
    const { error } = await supabase.from('products').upsert(prods)
    if (error) console.error('Erro produtos:', error.message)
    else console.log(`✅ ${prods.length} produtos migrados!`)
  }

  await prisma.$disconnect()
  console.log('🎉 Migração concluída!')
}

migrate()