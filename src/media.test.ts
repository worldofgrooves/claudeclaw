import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import { buildPhotoMessage, buildDocumentMessage, cleanupOldUploads, UPLOADS_DIR, redactBotToken } from './media.js';

describe('buildPhotoMessage', () => {
  it('returns string containing the file path', () => {
    const msg = buildPhotoMessage('/tmp/photo.jpg');
    expect(msg).toContain('/tmp/photo.jpg');
  });

  it('includes caption when provided', () => {
    const msg = buildPhotoMessage('/tmp/photo.jpg', 'My vacation');
    expect(msg).toContain('My vacation');
  });

  it('works without caption', () => {
    const msg = buildPhotoMessage('/tmp/photo.jpg');
    expect(msg).not.toContain('Caption');
  });

  it('output mentions "Photo" or "image"', () => {
    const msg = buildPhotoMessage('/tmp/photo.jpg');
    const lower = msg.toLowerCase();
    expect(lower.includes('photo') || lower.includes('image')).toBe(true);
  });
});

describe('buildDocumentMessage', () => {
  it('returns string containing the file path', () => {
    const msg = buildDocumentMessage('/tmp/doc.pdf', 'doc.pdf');
    expect(msg).toContain('/tmp/doc.pdf');
  });

  it('returns string containing the filename', () => {
    const msg = buildDocumentMessage('/tmp/doc.pdf', 'report.pdf');
    expect(msg).toContain('report.pdf');
  });

  it('includes caption when provided', () => {
    const msg = buildDocumentMessage('/tmp/doc.pdf', 'doc.pdf', 'Annual report');
    expect(msg).toContain('Annual report');
  });

  it('works without caption', () => {
    const msg = buildDocumentMessage('/tmp/doc.pdf', 'doc.pdf');
    expect(msg).not.toContain('Caption');
  });
});

describe('cleanupOldUploads', () => {
  it('does not throw when UPLOADS_DIR exists and is empty', () => {
    // UPLOADS_DIR is created on module load, so it exists
    expect(() => cleanupOldUploads()).not.toThrow();
  });

  it('does not throw when called with default maxAge', () => {
    expect(() => cleanupOldUploads()).not.toThrow();
  });

  it('deletes old files but keeps new files', () => {
    // Create a temp subdir inside UPLOADS_DIR for isolation
    const testDir = path.join(UPLOADS_DIR, 'cleanup-test');
    fs.mkdirSync(testDir, { recursive: true });

    const oldFile = path.join(UPLOADS_DIR, 'old-cleanup-test.txt');
    const newFile = path.join(UPLOADS_DIR, 'new-cleanup-test.txt');

    try {
      // Write both files
      fs.writeFileSync(oldFile, 'old content');
      fs.writeFileSync(newFile, 'new content');

      // Backdate the old file by 48 hours
      const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
      fs.utimesSync(oldFile, twoDaysAgo, twoDaysAgo);

      cleanupOldUploads();

      // Old file should be deleted
      expect(fs.existsSync(oldFile)).toBe(false);
      // New file should remain
      expect(fs.existsSync(newFile)).toBe(true);
    } finally {
      // Cleanup
      try { fs.unlinkSync(newFile); } catch { /* ignore */ }
      try { fs.unlinkSync(oldFile); } catch { /* ignore */ }
      try { fs.rmdirSync(testDir); } catch { /* ignore */ }
    }
  });
});

describe('redactBotToken', () => {
  it('redacts bot token from Telegram API URL', () => {
    const url = 'https://api.telegram.org/bot123456:ABC-DEF/getFile?file_id=abc';
    expect(redactBotToken(url)).toBe('https://api.telegram.org/bot[REDACTED]/getFile?file_id=abc');
  });

  it('redacts bot token from Telegram file download URL', () => {
    const url = 'https://api.telegram.org/file/bot123456:ABC-DEF/photos/file_1.jpg';
    expect(redactBotToken(url)).toBe('https://api.telegram.org/file/bot[REDACTED]/photos/file_1.jpg');
  });

  it('does not modify URLs without bot tokens', () => {
    const url = 'https://example.com/api/resource';
    expect(redactBotToken(url)).toBe('https://example.com/api/resource');
  });

  it('handles empty string', () => {
    expect(redactBotToken('')).toBe('');
  });

  it('redacts multiple tokens in a single string', () => {
    const msg = 'Failed: https://api.telegram.org/bot123:ABC/getFile then https://api.telegram.org/file/bot456:DEF/file.jpg';
    const result = redactBotToken(msg);
    expect(result).not.toContain('123:ABC');
    expect(result).not.toContain('456:DEF');
    expect(result).toContain('bot[REDACTED]/');
  });
});

describe('UPLOADS_DIR', () => {
  it('is an absolute path', () => {
    expect(path.isAbsolute(UPLOADS_DIR)).toBe(true);
  });

  it('ends with workspace/uploads', () => {
    expect(UPLOADS_DIR).toMatch(/workspace[/\\]uploads$/);
  });
});
