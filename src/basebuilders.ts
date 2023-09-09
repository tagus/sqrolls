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
	 * @param arg The user provided arg
	 */
	whereIsEqual(field: string, arg: unknown) : T {
		this.predicates.push(pr.isEqual(field, arg));
		return this.getThis();
	}

	/**
	 * Adds an equals check only if the conditional check is true.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 * @param check The conditional check
	 */
	whereIsEqualIf(field: string, arg: unknown, check: boolean) : T {
		if (check) {
			return this.whereIsEqual(field, arg);
		}
		return this.getThis();
	}

	/**
	 * Adds a not equal check between the given field and arg.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 */
	whereIsNotEquals(field: string, arg: unknown) : T {
		this.predicates.push(pr.isNotEqual(field, arg));
		return this.getThis();
	}

	/**
	 * Adds a not equal check only if the conditional check is true.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 * @param check The conditional check
	 */
	whereIsNotEqualsIf(field: string, arg: unknown, check: boolean) : T {
		if (check) {
			return this.whereIsNotEquals(field, arg);
		}
		return this.getThis();
	}

	/**
	 * Adds a less than check the given field and arg.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 */
	whereIsLessThan(field: string, arg: unknown) : T {
		this.predicates.push(pr.isLessThan(field, arg));
		return this.getThis();
	}

	/**
	 * Adds a less than or equal to check the given field and arg.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 */
	whereIsLessThanOrEqualTo(field: string, arg: unknown) : T {
		this.predicates.push(pr.isLessThanOrEqualTo(field, arg));
		return this.getThis();
	}

	/**
	 * Adds a greater than check the given field and arg.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 */
	whereIsGreaterThan(field: string, arg: unknown) : T {
		this.predicates.push(pr.isGreaterThan(field, arg));
		return this.getThis();
	}

	/**
	 * Adds a greater than check the given field and arg.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 */
	whereIsGreaterThanOrEqualTo(field: string, arg: unknown) : T {
		this.predicates.push(pr.isGreaterThanOrEqualTo(field, arg));
		return this.getThis();
	}

	/**
	 * Adds a less than check the given field and arg.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 * @param check The conditional check
	 */
	whereIsLessThanIf(field: string, arg: unknown, check: boolean) : T {
		if (check) {
			this.predicates.push(pr.isLessThan(field, arg));
		}
		return this.getThis();
	}

	/**
	 * Adds a less than or equal to check the given field and arg.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 * @param check The conditional check
	 */
	whereIsLessThanOrEqualToIf(field: string, arg: unknown, check: boolean) : T {
		if (check) {
			this.predicates.push(pr.isLessThanOrEqualTo(field, arg));
		}
		return this.getThis();
	}

	/**
	 * Adds a greater than check the given field and arg.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 * @param check The conditional check
	 */
	whereIsGreaterThanIf(field: string, arg: unknown, check: boolean) : T {
		if (check) {
			this.predicates.push(pr.isGreaterThan(field, arg));
		}
		return this.getThis();
	}

	/**
	 * Adds a greater than check the given field and arg.
	 *
	 * @param field The field name
	 * @param arg The user provided arg
	 * @param check The conditional check
	 */
	whereIsGreaterThanOrEqualToIf(field: string, arg: unknown, check: boolean) : T {
		if (check) {
			this.predicates.push(pr.isGreaterThanOrEqualTo(field, arg));
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
			return this.whereIsNull(field);
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
			return this.whereIsNotNull(field);
		}
		return this.getThis();
	}

	/**
	 * Adds a check for a specific pattern for the given field.
	 *
	 * @param field The field name
	 * @param pattern The string pattern
	 */
	whereIsLike(field: string, pattern: string): T {
		this.predicates.push(pr.isLike(field, pattern));
		return this.getThis();
	}

	/**
	 * Adds a check for a specific pattern for the given field
	 *
	 * @param field The field name
	 * @param pattern The string pattern
	 * @param check The conditional check
	 */
	whereIsLikeIf(field: string, pattern: string, check: boolean): T {
		if (check) {
			return this.whereIsLike(field, pattern);
		}
		return this.getThis();
	}

	/**
	 * Adds a set membership check
	 *
	 * @param field The field name
	 * @param args The value list
	 */
	whereIn(field: string, ...args: unknown[]): T {
		this.predicates.push(pr.isIn(field, args));
		return this.getThis();
	}
}
