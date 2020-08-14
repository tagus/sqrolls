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
			.whereIsEqual('id', 1);

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
			.whereIsEqual('id', 1)
			.whereIsNullIf('archived_at', false);

		const stmt = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
		const args = ['frank', 'warthog@wolfcola.com', 1];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});

	it('does not include a set if the conditional check is false', () => {
		const qb = Update.builder()
			.setTable('users')
			.set('name', 'frank')
			.setIf('email', 'warthog@wolfcola.com', false);

		const stmt = 'UPDATE users SET name = ?';
		const args = ['frank'];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});

	it('throws an error for empty update', () => {
		const qb = Update.builder()
			.setTable('users')
			.setIf('name', 'frank', false)
			.whereIsEqual('id', 4);

		expect(qb.toSQL).toThrow();
	});
});
