#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const OUT = path.join(ROOT, ".ai-task", "backend-database-capabilities.md");
async function exists(p){try{await fs.access(p);return true}catch{return false}}
async function readJson(p){return JSON.parse(await fs.readFile(p,"utf8"))}
async function find(names, dir=ROOT, depth=0, acc=[]){if(depth>5)return acc;let es=[];try{es=await fs.readdir(dir,{withFileTypes:true})}catch{return acc}for(const e of es){if(["node_modules",".git","dist","build",".next","vendor"].includes(e.name))continue;const p=path.join(dir,e.name);if(names.some(n=>typeof n==="string"?e.name===n:n.test(e.name)))acc.push(p);if(e.isDirectory())await find(names,p,depth+1,acc)}return acc}
function has(deps,names){return names.some(n=>deps[n]||Object.keys(deps).some(d=>d.includes(n)))}
function rel(p){return path.relative(ROOT,p).replaceAll("\\","/")}
async function main(){
  await fs.mkdir(path.dirname(OUT),{recursive:true});
  const pkg=await exists(path.join(ROOT,"package.json"))?await readJson(path.join(ROOT,"package.json")):null;
  const deps={...(pkg?.dependencies||{}),...(pkg?.devDependencies||{})};
  const files=await find(["composer.json","pyproject.toml","requirements.txt","go.mod","Cargo.toml","pom.xml","Dockerfile",/^docker-compose\./,"schema.prisma",/^drizzle\.config\./,/^openapi\.(ya?ml|json)$/,/^swagger\.(ya?ml|json)$/,".env.example","AGENTS.md","config.toml"]);
  const pm=await exists(path.join(ROOT,"pnpm-lock.yaml"))?"pnpm":await exists(path.join(ROOT,"yarn.lock"))?"yarn":await exists(path.join(ROOT,"bun.lock"))||await exists(path.join(ROOT,"bun.lockb"))?"bun":await exists(path.join(ROOT,"package-lock.json"))?"npm":await exists(path.join(ROOT,"composer.json"))?"composer":await exists(path.join(ROOT,"poetry.lock"))?"poetry":await exists(path.join(ROOT,"go.mod"))?"go":await exists(path.join(ROOT,"Cargo.toml"))?"cargo":await exists(path.join(ROOT,"pom.xml"))?"maven":"unknown";
  const stack=[];
  if(has(deps,["express"]))stack.push("Express"); if(has(deps,["fastify"]))stack.push("Fastify"); if(has(deps,["@nestjs/"]))stack.push("NestJS"); if(has(deps,["hono"]))stack.push("Hono"); if(has(deps,["next"]))stack.push("Next.js API routes");
  if(await exists(path.join(ROOT,"artisan")))stack.push("Laravel"); if(await exists(path.join(ROOT,"manage.py")))stack.push("Django/Flask/FastAPI candidate"); if(await exists(path.join(ROOT,"Gemfile")))stack.push("Rails/Ruby candidate"); if(await exists(path.join(ROOT,"go.mod")))stack.push("Go"); if(await exists(path.join(ROOT,"Cargo.toml")))stack.push("Rust"); if(await exists(path.join(ROOT,"wp-config.php")))stack.push("WordPress");
  const caps={
    Prisma:has(deps,["prisma","@prisma/client"])||files.some(f=>f.endsWith("schema.prisma")),Drizzle:has(deps,["drizzle"]),TypeORM:has(deps,["typeorm"]),Sequelize:has(deps,["sequelize"]),Knex:has(deps,["knex"]),Mongoose:has(deps,["mongoose"]),Supabase:has(deps,["supabase"]),Firebase:has(deps,["firebase"]),PostgreSQL:has(deps,["pg","postgres"]),MySQL:has(deps,["mysql","mysql2"]),SQLite:has(deps,["sqlite"]),MongoDB:has(deps,["mongodb","mongoose"]),Redis:has(deps,["redis","ioredis"]),Queues:has(deps,["bullmq","bull","bee-queue"]),Validation:has(deps,["zod","joi","yup","class-validator"]),Auth:has(deps,["jsonwebtoken","next-auth","@auth/","clerk","auth0"]),Stripe:has(deps,["stripe"]),Email:has(deps,["resend","nodemailer"]),Docker:files.some(f=>path.basename(f).startsWith("Dockerfile")||path.basename(f).startsWith("docker-compose")),OpenAPI:files.some(f=>/openapi|swagger/i.test(f)),Tests:pkg?Object.keys(pkg.scripts||{}).some(s=>/test|check|lint|type/i.test(s)):false
  };
  const routeDirs=(await find(["routes","controllers","services","api"],ROOT,3)).filter(async p=>(await fs.stat(p)).isDirectory).slice(0,50);
  const migrationDirs=(await find(["migrations","prisma","supabase","database"],ROOT,4)).slice(0,50);
  const md=`# Backend/Database Capabilities\n\nGenerated: ${new Date().toISOString()}\nRoot: ${ROOT}\n\n## Stack\n- Detected: ${stack.join(", ")||"unknown"}\n- Package/language manager: ${pm}\n\n## Commands\n${pkg?.scripts?Object.entries(pkg.scripts).map(([k,v])=>`- ${k}: \`${v}\``).join("\n"):"- No package scripts detected"}\n\n## Capabilities\n${Object.entries(caps).map(([k,v])=>`- ${k}: ${v?"yes":"no"}`).join("\n")}\n\n## Important Files\n${files.map(f=>`- ${rel(f)}`).join("\n")||"- None detected"}\n\n## API Route Folders\n${routeDirs.map(f=>`- ${rel(f)}`).join("\n")||"- None detected"}\n\n## DB Schema/Migration Folders\n${migrationDirs.map(f=>`- ${rel(f)}`).join("\n")||"- None detected"}\n\n## Safe Verification Commands\n- Run project tests/build/typecheck if scripts exist.\n- Run \`node ~/.codex/agentic-backend-database/tools/api-route-map.mjs\` for API work.\n- Run \`node ~/.codex/agentic-backend-database/tools/db-engine-detect.mjs\` for DB work.\n- Run \`node ~/.codex/agentic-backend-database/tools/env-secret-audit.mjs\` before env/security work.\n\n## Warnings\n- This scan is static and does not prove runtime behavior.\n- Do not connect to production DBs without explicit approval.\n`;
  await fs.writeFile(OUT,md); console.log(OUT);
}
main().catch(e=>{console.error(e.stack||e.message);process.exit(1)});
