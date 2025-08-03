import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	nama: text('nama').notNull(),
	username: text('username').notNull().unique(),
	password: text('password').notNull(),
});

export const berita = sqliteTable('berita', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	judul: text('judul').notNull(),
	isi: text('isi').notNull(),
	gambar: text('gambar').notNull(),
	tanggal: text('tanggal').notNull(),
});

export const galeri = sqliteTable('galeri', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	judul: text('judul').notNull(),
	gambar: text('gambar').notNull(),
	tanggal: text('tanggal').notNull(),
});
