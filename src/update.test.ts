import Update from './update';

describe('update builder', () => {
	it('builds update stmt without any where clauses', () => {
		const qb = Update.builder()
			.setTable('users')
			.set('name', 'frank')
			.set('email', 'warthog@wolfcola.com');

		const stmt = 'UPDATE users SET name = ?, email = ?';
		const args = ['frank', 'warthog@wolfcola.com'];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});

	it('builds update stmt with where clauses', () => {
		const qb = Update.builder()
			.setTable('users')
			.set('name', 'frank')
			.set('email', 'warthog@wolfcola.com')
			.whereIsEquals('id', 1);

		const stmt = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
		const args = ['frank', 'warthog@wolfcola.com', 1];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});


	it('does not include where clause when conditional check if false', () => {
		const qb = Update.builder()
			.setTable('users')
			.set('name', 'frank')
			.set('email', 'warthog@wolfcola.com')
			.whereIsEquals('id', 1)
			.whereIsNullIf('archived_at', false);

		const stmt = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
		const args = ['frank', 'warthog@wolfcola.com', 1];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});
});
