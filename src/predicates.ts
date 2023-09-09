/**
 * Defines a sql predicate statement used to narrow queries.
 */
export class Predicate {
	clause: string;
	arg?: unknown;

	constructor(clause: string, arg: unknown=undefined) {
		this.clause = clause;
		this.arg = arg;
	}

	/**
	 * Determines if the predicate's arg is set.
	 */
	hasArg(): boolean {
		return this.arg !== undefined;
	}
}

/**
 * `<field> = <arg>` check between a field and the given arg.
 *
 * @param field The field name
 * @param arg The user given arg
 */
export function isEqual(field: string, arg: unknown): Predicate {
	return new Predicate(`${field} = ?`, arg);
}

/**
 *`<field> != <arg>` check between a field and the given arg.
 *
 * @param field The field name
 * @param arg The user given arg
 */
export function isNotEqual(field: string, arg: unknown): Predicate {
	return new Predicate(`${field} != ?`, arg);
}

/**
 * `<field> < <arg>` check between a field and the given arg.
 *
 * @param field The field name
 * @param arg The user given arg
 */
export function isLessThan(field: string, arg: unknown): Predicate {
	return new Predicate(`${field} < ?`, arg);
}

/**
 * `<field> <= <arg>` check between a field and the given arg.
 *
 * @param field The field name
 * @param arg The user given arg
 */
export function isLessThanOrEqualTo(field: string, arg: unknown): Predicate {
	return new Predicate(`${field} <= ?`, arg);
}

/**
 * `<field> >= <arg>` check between a field and the given arg.
 *
 * @param field The field name
 * @param arg The user given arg
 */
export function isGreaterThanOrEqualTo(field: string, arg: unknown): Predicate {
	return new Predicate(`${field} >= ?`, arg);
}

/**
 * `<field> > <arg>` check between a field and the given arg.
 *
 * @param field The field name
 * @param arg The user given arg
 */
export function isGreaterThan(field: string, arg: unknown): Predicate {
	return new Predicate(`${field} > ?`, arg);
}

/**
 * `<field> IS NULL` check between a field and the given arg.
 *
 * @param field The field name
 * @param arg The user given arg
 */
export function isNull(field: string): Predicate {
	return new Predicate(`${field} IS NULL`);
}

/**
 * `<field> IS NOT NULL` check between a field and the given arg.
 *
 * @param field The field name
 * @param arg The user given arg
 */
export function isNotNull(field: string): Predicate {
	return new Predicate(`${field} IS NOT NULL`);
}

/**
 * `<field> LIKE <arg>` check between a field and the string pattern
 *
 * @param field The field name
 * @param pattern The user given pattern
 */
export function isLike(field: string, pattern: string): Predicate {
	return new Predicate(`${field} LIKE ?`, pattern);
}

/**
 * `<field> IN (<args>)` check between a field and the given args
 *
 * @param field The field name
 * @param args The set values
 */
export function isIn(field: string, args: unknown[]): Predicate {
	const wildcards = args.map(() => '?').join(',');
	return new Predicate(`${field} IN (${wildcards})`, args);
}
