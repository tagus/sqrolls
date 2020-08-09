import Insert from './insert';

describe('insert builder', () => {
	it('builds valid insert statement', () => {
		const qb = Insert.builder()
			.into('users')
			.setColumns('id', 'name', 'email')
			.addValues('frank', 'warthog@wolfcola.com');

		const stmt = 'INSERT INTO users (id, name, email) VALUES (?, ?)';
		const args = ['frank', 'warthog@wolfcola.com'];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});

	it('accounts for multiple values ', () => {
		const qb = Insert.builder()
			.into('users')
			.setColumns('id', 'name', 'email')
			.addValues('frank', 'warthog@wolfcola.com')
			.addValues('nightman', 'nightman@wolfcola.com');

		const stmt = 'INSERT INTO users (id, name, email) VALUES (?, ?), (?, ?)';
		const args = ['frank', 'warthog@wolfcola.com', 'nightman', 'nightman@wolfcola.com'];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});
});
