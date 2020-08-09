import { PredicateBaseBuilder } from './basebuilders';

interface UpdateClause {
	field: string;
	arg: unknown;
}

/**
 * A query builder for update statements.
 */
class Update extends PredicateBaseBuilder<Update> {
	private updates : UpdateClause[]

	static builder(): Update {
		return new Update();
	}

	private constructor() {
		super();
		this.updates = [];
	}

	getThis() : Update {
		return this;
	}

	set(field: string, arg: unknown) : Update {
		this.updates.push({ field, arg });
		return this;
	}

	/**
	 * Builds the final select statement.
	 */
	toSQL() : [string, unknown[]] {
		let stmt = 'UPDATE ' + this.table + ' SET ';
		stmt += this.updates.map(u => `${u.field} = ?`).join(', ');
		const args = this.updates.map(u => u.arg);
		if (this.predicates.length > 0) {
			stmt += ' WHERE ' + this.predicates.map(p => p.clause).join(' AND ');
			const _args = this.predicates.filter(p => p.hasArg()).map(p => p.arg);
			args.push(..._args);
		}
		return [stmt, args];
	}
}

export default Update;
