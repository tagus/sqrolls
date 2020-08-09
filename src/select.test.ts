import Select from './select';

describe('select builder', () => {
	it('accounts for all where equals', () => {
		const qb = Select.builder()
			.select('id', 'name', 'email')
			.from('users')
			.whereIsEquals('name', 'frank')
			.whereIsEquals('email', 'warthog@wolfcola.com');

		const stmt = 'SELECT id, name, email FROM users WHERE name = ? AND email = ?';
		const args = ['frank', 'warthog@wolfcola.com'];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});

	it('does not include args for null predicates', () => {
		const qb = Select.builder()
			.select('id', 'name', 'email')
			.from('users')
			.whereIsNull('name')
			.whereIsNotNull('email');

		const stmt = 'SELECT id, name, email FROM users WHERE name IS NULL AND email IS NOT NULL';
		const args : unknown[] = [];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});

	it('does not include clause when check is false', () => {
		const qb = Select.builder()
			.select('id', 'name', 'email')
			.from('users')
			.whereIsEqualsIf('name', 'frank', false)
			.whereIsEquals('email', 'warthog@wolfcola.com');

		const stmt = 'SELECT id, name, email FROM users WHERE email = ?';
		const args = ['warthog@wolfcola.com'];

		const [_stmt, _args] = qb.toSQL();
		expect(_stmt).toEqual(stmt);
		expect(_args).toEqual(args);
	});
});
