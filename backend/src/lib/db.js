import 'dotenv/config'
import { supabase } from './supabaseClient.js'
import pkg from 'pg'
const { Pool } = pkg

const isProduction = process.env.NODE_ENV === 'production'

// Banco local (dev)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// Exporta a query certa dependendo do ambiente
export const db = {
  // Para queries SQL brutas (banco local)
  query: (text, params) => pool.query(text, params),
  
  // Cliente Supabase (produção)
  supabase
}

export const isProd = isProduction