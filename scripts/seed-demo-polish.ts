#!/usr/bin/env tsx

/**
 * Seed script for Polish demo project: "KPI Chatbot für Finanzabteilung"
 *
 * This script creates:
 * - 1 Project (Polish)
 * - 5 Persons (Finance team members)
 * - 10 Notes (Meeting notes)
 * - Relationships between project, persons, and notes
 *
 * Requirements:
 *   - SUPABASE_SERVICE_ROLE_KEY must be set in .env.local
 *   - Get it from: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/settings/api
 *
 * Usage:
 *   npm run seed:demo
 *   npm run seed:demo -- --user-id=<UUID>
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { join } from 'path';

// Load .env.local from project root (parent directory of scripts/)
config({ path: join(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';
import { demoProject } from './demo-data/projects';
import { demoPersons } from './demo-data/persons';
import { demoNotes } from './demo-data/notes';

// Initialize Supabase client with SERVICE ROLE KEY for seeding
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase environment variables');
  console.error('Please make sure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  console.error('');
  console.error('Get your Service Role Key from:');
  console.error('https://supabase.com/dashboard/project/YOUR_PROJECT_ID/settings/api');
  console.error('');
  console.error('⚠️  IMPORTANT: The Service Role Key bypasses RLS policies.');
  console.error('   Never use it in your frontend code - only for backend/scripts!');
  process.exit(1);
}

// Use Service Role Key to bypass RLS policies (for seeding only!)
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

// Helper to get timestamp from days ago
function getTimestampFromDaysAgo(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

async function seedDemoData() {
  console.log('🌱 Starting demo data seeding...\n');

  try {
    // 1. Get user ID (from session or command line argument)
    let userId: string;

    const userIdArg = process.argv.find((arg) => arg.startsWith('--user-id='));
    if (userIdArg) {
      userId = userIdArg.split('=')[1];
      console.log(`📋 Using user ID from argument: ${userId}`);
    } else {
      // Try to get from current session
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('❌ Error: No authenticated user found');
        console.error('Please either:');
        console.error('  1. Log in to the app first, or');
        console.error('  2. Provide --user-id=<UUID> argument');
        process.exit(1);
      }

      userId = user.id;
      console.log(`👤 Using authenticated user: ${user.email} (${userId})`);
    }

    console.log('\n--- Step 1: Creating Project ---');

    // 2. Create project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        user_id: userId,
        name: demoProject.name,
        description: demoProject.description,
        status: demoProject.status,
        goals: demoProject.goals,
        deadline: demoProject.deadline,
      })
      .select()
      .single();

    if (projectError) {
      console.error('❌ Failed to create project:', projectError.message);
      throw projectError;
    }

    console.log(`✅ Created project: "${project.name}" (ID: ${project.id})`);

    console.log('\n--- Step 2: Creating Persons ---');

    // 3. Create persons
    const createdPersons = [];
    for (const person of demoPersons) {
      const { data: createdPerson, error: personError } = await supabase
        .from('persons')
        .insert({
          user_id: userId,
          name: person.name,
          role: person.role,
          description: person.description,
          expertise: person.expertise,
          contact: person.contact,
        })
        .select()
        .single();

      if (personError) {
        console.error(`❌ Failed to create person "${person.name}":`, personError.message);
        throw personError;
      }

      createdPersons.push(createdPerson);
      console.log(`✅ Created person: ${createdPerson.name} (${createdPerson.role})`);
    }

    console.log('\n--- Step 3: Linking Persons to Project ---');

    // 4. Link all persons to project
    for (const person of createdPersons) {
      const { error: linkError } = await supabase.from('project_persons').insert({
        project_id: project.id,
        person_id: person.id,
      });

      if (linkError) {
        console.error(`❌ Failed to link person "${person.name}" to project:`, linkError.message);
        throw linkError;
      }

      console.log(`🔗 Linked ${person.name} to project`);
    }

    console.log('\n--- Step 4: Creating Notes ---');

    // 5. Create notes
    for (let i = 0; i < demoNotes.length; i++) {
      const noteData = demoNotes[i];

      const { data: createdNote, error: noteError } = await supabase
        .from('notes')
        .insert({
          user_id: userId,
          project_id: project.id,
          content: noteData.content,
          created_at: getTimestampFromDaysAgo(noteData.daysAgo),
        })
        .select()
        .single();

      if (noteError) {
        console.error(`❌ Failed to create note #${i + 1}:`, noteError.message);
        throw noteError;
      }

      // 6. Link note to persons
      for (const personIndex of noteData.personIndices) {
        const person = createdPersons[personIndex];

        const { error: noteLinkError } = await supabase.from('note_persons').insert({
          note_id: createdNote.id,
          person_id: person.id,
        });

        if (noteLinkError) {
          console.error(
            `❌ Failed to link note to person "${person.name}":`,
            noteLinkError.message
          );
          throw noteLinkError;
        }
      }

      const involvedPersons = noteData.personIndices
        .map((idx) => createdPersons[idx].name)
        .join(', ');
      console.log(
        `✅ Created note #${i + 1} (${noteData.daysAgo}d ago) - Persons: ${involvedPersons}`
      );
    }

    console.log('\n✨ Demo data seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`  • Project: "${project.name}"`);
    console.log(`  • Persons: ${createdPersons.length}`);
    console.log(`  • Notes: ${demoNotes.length}`);
    console.log('\n🔍 Verification:');
    console.log('  1. Log in to the app');
    console.log('  2. Navigate to /projects → See the new Polish project');
    console.log('  3. Open project → Timeline with 10 notes');
    console.log('  4. Tab "Beteiligte" → 5 persons linked');
    console.log('  5. Navigate to /persons → 5 new contacts');
  } catch (error) {
    console.error('\n💥 Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seed script
seedDemoData();
