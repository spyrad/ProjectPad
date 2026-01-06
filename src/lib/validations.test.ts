import { describe, it, expect } from 'vitest';
import {
  emailSchema,
  passwordSchema,
  signInSchema,
  signUpSchema,
  projectSchema,
  personSchema,
  noteSchema,
} from './validations';

describe('Email Schema', () => {
  it('accepts valid email', () => {
    expect(emailSchema.safeParse('test@example.com').success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = emailSchema.safeParse('invalid-email');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Ungültige E-Mail-Adresse');
    }
  });

  it('rejects empty string', () => {
    expect(emailSchema.safeParse('').success).toBe(false);
  });
});

describe('Password Schema', () => {
  it('accepts valid password (8+ chars)', () => {
    expect(passwordSchema.safeParse('password123').success).toBe(true);
  });

  it('rejects password < 8 chars', () => {
    const result = passwordSchema.safeParse('1234567');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Passwort muss mindestens 8 Zeichen lang sein');
    }
  });
});

describe('Sign In Schema', () => {
  it('accepts valid credentials', () => {
    const data = {
      email: 'test@example.com',
      password: 'anypassword',
    };
    expect(signInSchema.safeParse(data).success).toBe(true);
  });

  it('rejects invalid email', () => {
    const data = {
      email: 'invalid',
      password: 'password',
    };
    expect(signInSchema.safeParse(data).success).toBe(false);
  });

  it('rejects empty password', () => {
    const data = {
      email: 'test@example.com',
      password: '',
    };
    const result = signInSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Passwort ist erforderlich');
    }
  });
});

describe('Sign Up Schema', () => {
  it('accepts valid signup data', () => {
    const data = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };
    expect(signUpSchema.safeParse(data).success).toBe(true);
  });

  it('rejects mismatched passwords', () => {
    const data = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'different',
    };
    const result = signUpSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Passwörter stimmen nicht überein');
    }
  });

  it('rejects short password', () => {
    const data = {
      email: 'test@example.com',
      password: '1234',
      confirmPassword: '1234',
    };
    expect(signUpSchema.safeParse(data).success).toBe(false);
  });
});

describe('Project Schema', () => {
  it('accepts valid project data', () => {
    const data = {
      name: 'Test Project',
      description: 'Description',
      status: 'active' as const,
      goals: 'Goals',
      deadline: '2024-12-31',
    };
    expect(projectSchema.safeParse(data).success).toBe(true);
  });

  it('accepts minimal project data', () => {
    const data = {
      name: 'Test',
      status: 'active' as const,
    };
    expect(projectSchema.safeParse(data).success).toBe(true);
  });

  it('rejects empty name', () => {
    const data = {
      name: '',
      status: 'active' as const,
    };
    const result = projectSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Name ist erforderlich');
    }
  });

  it('rejects name > 100 chars', () => {
    const data = {
      name: 'a'.repeat(101),
      status: 'active' as const,
    };
    const result = projectSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Name zu lang');
    }
  });

  it('rejects invalid status', () => {
    const data = {
      name: 'Test',
      status: 'invalid',
    };
    expect(projectSchema.safeParse(data).success).toBe(false);
  });

  it('accepts all valid status values', () => {
    const statuses = ['active', 'paused', 'completed'] as const;
    statuses.forEach((status) => {
      const data = { name: 'Test', status };
      expect(projectSchema.safeParse(data).success).toBe(true);
    });
  });
});

describe('Person Schema', () => {
  it('accepts valid person data', () => {
    const data = {
      name: 'John Doe',
      role: 'Developer',
      description: 'Senior developer',
      expertise: 'React, TypeScript',
      contact: 'john@example.com',
    };
    expect(personSchema.safeParse(data).success).toBe(true);
  });

  it('accepts minimal person data', () => {
    const data = {
      name: 'John',
    };
    expect(personSchema.safeParse(data).success).toBe(true);
  });

  it('rejects empty name', () => {
    const data = {
      name: '',
    };
    const result = personSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Name ist erforderlich');
    }
  });

  it('rejects too long fields', () => {
    const data = {
      name: 'a'.repeat(101),
    };
    expect(personSchema.safeParse(data).success).toBe(false);
  });
});

describe('Note Schema', () => {
  it('accepts valid note data', () => {
    const data = {
      content: 'My note content',
      project_id: '123e4567-e89b-12d3-a456-426614174000',
      person_id: '123e4567-e89b-12d3-a456-426614174001',
    };
    expect(noteSchema.safeParse(data).success).toBe(true);
  });

  it('accepts note without project_id', () => {
    const data = {
      content: 'My note',
    };
    expect(noteSchema.safeParse(data).success).toBe(true);
  });

  it('rejects empty content', () => {
    const data = {
      content: '',
    };
    const result = noteSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Inhalt ist erforderlich');
    }
  });

  it('rejects invalid UUID for project_id', () => {
    const data = {
      content: 'My note',
      project_id: 'not-a-uuid',
    };
    expect(noteSchema.safeParse(data).success).toBe(false);
  });

  it('rejects invalid UUID for person_id', () => {
    const data = {
      content: 'My note',
      person_id: 'not-a-uuid',
    };
    expect(noteSchema.safeParse(data).success).toBe(false);
  });
});
