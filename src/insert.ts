import { BaseBuilder } from './basebuilders';

/**
 * A query builder for select statements.
 */
class Insert extends BaseBuilder<Insert> {
	private values: unknown[][]
	private columns: string[]

	static builder(): Insert {
		return new Insert();
	}

	getThis() : Insert {
		return this;
	}

	private constructor() {
		super();
		this.values = [];
	}

	/**
	 * @param table The table to insert into
	 */
	into(table: string) : Insert {
		this.setTable(table);
		return this;
	}

	/**
	 * @param columns The row columns being inserted
	 */
	setColumns(...columns: string[]) : Insert {
		this.columns = columns;
		return this;
	}

	/**
	 * @param args The values for an inserted row
	 */
	addValues(...args: unknown[]) : Insert {
		this.values.push(args);
		return this;
	}

	/**
	 * Builds the final insert statement.
	 */
	toSQL() : [string, unknown[]] {
		if (this.values.length === 0) {
			throw new Error('empty insert statement');
		}
		let stmt = 'INSERT INTO ' + this.table + ' (' + this.columns.join(', ') + ') VALUES ';
		stmt += this.values.map(args => '(' + args.map(() => '?').join(', ') + ')').join(', ');
		const args = this.values.reduce((acc, cur) => acc.concat(cur), []);
		return [stmt, args];
	}
}

export default Insert;
