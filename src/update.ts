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
	 * Sets a field if the conditional check is true.
	 *
	 * @param field The field name
	 * @param arg The value to set
	 * @param check The conditional check
	 */
	setIf(field: string, arg: unknown, check: boolean) : Update {
		if (check) {
			return this.set(field, arg);
		}
		return this;
	}

	/**
	 * Builds the final select statement.
	 */
	toSQL() : [string, unknown[]] {
		let stmt = 'UPDATE ' + this.table;
		if (this.updates.length > 0) {
			stmt += ' SET ' + this.updates.map(u => `${u.field} = ?`).join(', ');
		}
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
