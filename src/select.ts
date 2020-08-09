import { PredicateBaseBuilder } from './basebuilders';

/**
 * A query builder for select statements.
 */
class Select extends PredicateBaseBuilder<Select> {
	private columns: string[];

	private constructor() {
		super();
	}

	static builder(): Select {
		return new Select();
	}

	getThis() : Select {
		return this;
	}

	/**
	 * @param table The table to select from.
	 */
	from(table: string) : Select {
		this.setTable(table);
		return this;
	}

	/**
	 * @param columns The columns to select
	 */
	select(...columns: string[]) : Select {
		this.columns = columns;
		return this;
	}

	/**
	 * Builds the final select statement.
	 */
	toSQL() : [string, unknown[]] {
		let stmt = 'SELECT ' + this.columns.join(', ') + ' FROM ' + this.table;
		const args : unknown[] = [];
		if (this.predicates.length > 0) {
			stmt += ' WHERE ' + this.predicates.map(p => p.clause).join(' AND ');
			const _args = this.predicates.filter(p => p.hasArg()).map(p => p.arg);
			args.push(..._args);
		}
		return [stmt, args];
	}
}

export default Select;
