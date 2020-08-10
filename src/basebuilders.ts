import * as pr from './predicates';

/**
 * BaseBuilder defines the abstract building blocks for any given sql-like query.
 */
export abstract class BaseBuilder<T extends BaseBuilder<T>> {
	protected table: string;

	/**
	 * A neat way to get the type of the implementing subclass.
	 */
	abstract getThis(): T

	/**
	 * Builds the final sql-like select statement and returns a two-tuple of the
	 * statement and the user given arguments that will match the order and
	 * quantity of the argument placeholders.
	 */
	abstract toSQL() : [string, unknown[]]

	/**
	 * Sets the table for this statement.
	 *
	 * @param table The table name
	 */
	setTable(table: string) : T {
		this.table = table;
		return this.getThis();
	}
}

/**
 * PredicateBaseBuilder adds builder methods to adding different predicate types.
 */
export abstract class PredicateBaseBuilder<T extends PredicateBaseBuilder<T>> extends BaseBuilder<T> {
	protected predicates: pr.Predicate[];

	constructor() {
		super();
		this.predicates = [];
	}

	/**
	 * Adds an equals between the given field and arg.
	 *
	 * @param field The field name
	 * @param check The conditional check
	 */
	whereIsEqual(field: string, arg: unknown) : T {
		this.predicates.push(pr.isEqual(field, arg));
		return this.getThis();
	}

	/**
	 * Adds an equals check only if the conditional check is true.
	 *
	 * @param field The field name
	 * @param check The conditional check
	 */
	whereIsEqualIf(field: string, arg: unknown, check: boolean) : T {
		if (check) {
			this.whereIsEqual(field, arg);
		}
		return this.getThis();
	}

	/**
	 * Adds a not equal check between the given field and arg.
	 *
	 * @param field The field name
	 * @param check The conditional check
	 */
	whereIsNotEquals(field: string, arg: unknown) : T {
		this.predicates.push(pr.isNotEqual(field, arg));
		return this.getThis();
	}

	/**
	 * Adds a not equal check only if the conditional check is true.
	 *
	 * @param field The field name
	 * @param check The conditional check
	 */
	whereIsNotEqualsIf(field: string, arg: unknown, check: boolean) : T {
		if (check) {
			this.whereIsNotEquals(field, arg);
		}
		return this.getThis();
	}

	/**
	 * Adds a null check for the given field.
	 *
	 * @param field The field name
	 */
	whereIsNull(field: string) : T {
		this.predicates.push(pr.isNull(field));
		return this.getThis();
	}

	/**
	 * Adds a null check only if the conditional check is true.
	 *
	 * @param field The field name
	 * @param check The conditional check
	 */
	whereIsNullIf(field: string, check: boolean) : T {
		if (check) {
			this.whereIsNull(field);
		}
		return this.getThis();
	}

	/**
	 * Adds a not null check for the given field.
	 *
	 * @param field The field name
	 */
	whereIsNotNull(field: string) : T {
		this.predicates.push(pr.isNotNull(field));
		return this.getThis();
	}

	/**
	 * Adds a not null check only if the conditional check is true.
	 *
	 * @param field The field name
	 * @param check The conditional check
	 */
	whereIsNotNullIf(field: string, check: boolean) : T {
		if (check) {
			this.whereIsNotNull(field);
		}
		return this.getThis();
	}
}
