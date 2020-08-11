# sqrolls

A simple sql-like expression builder that makes it easy to build *sql-like* expressions
using a hierarchical builder pattern. The resulting statements should work for most sql
databases however it was primarily written to support working with sqlite3.

Currently only simple update, insert, and select queries are being supported.

## usage

The usage is written for a sqlite3 db. We will be writing example queries for a users
table with the following schema. The sqroll query builders don't interface directly with
a db but rather only build a valid sql expressions with substitutions in place of user
arguments. Each query builder has a `toSQL` method that returns a tuple of the final
sql expression and the arguments that can be given as inputs directly to a db connection.

```sql
CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	archived_at NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### selects

Selecting a specific user's name and email.

```js
const qb = Select.builder()
	.select('name', 'email')
	.from('users')
	.whereIsEqual('id', 1);

const [ stmt, args ] = qb.toSQL();

// stmt: 'SELECT * FROM users WHERE id = ?'
// args: [1]
```

Selecting all users that haven't been archived.

```js
const qb = Select.builder()
	.select('*')
	.from('users')
	.whereIsNotNull('archived_at');

const [ stmt, args ] = qb.toSQL();

// stmt: 'SELECT * FROM users WHERE archived_at IS NOT NULL'
// args: []
```

We sometimes need to query a table based on a search filter with optional fields.
The conditional where methods can help with this. Searching for archived users if
`isArchived` filter is true.

```js
const filter = {
	isArchived: false,
};

const qb = Select.builder()
	.select('*')
	.from('users')
	.whereIsNotNullIf('archived_at', filter.isArchived);

const [ stmt, args ] = qb.toSQL();

// stmt: 'SELECT * FROM users'
// args: []
```

### inserts

Inserting a single user.

```js
const qb = Insert.builder()
	.into('users')
	.setColumns('name', 'email')
	.addValues('frank', 'warthog@wolfcola.com');

const [ stmt, args ] = qb.toSQL();

// stmt: 'INSERT INTO users (name, email) VALUES (?, ?)'
// args: ['frank', 'warthog@wolfcola.com']
```

Bulk inserting multiple users.

```js
const qb = Insert.builder()
	.into('users')
	.setColumns('name', 'email')
	.addValues('frank', 'warthog@wolfcola.com')
	.addValues('dennis', 'dennis@paddys.com')
	.addValues('charlie', 'charlie@paddys.com');

const [ stmt, args ] = qb.toSQL();

// stmt: 'INSERT INTO users (name, email) VALUES (?, ?), (?, ?), (?, ?)'
// args: ['frank', 'warthog@wolfcola.com', 'dennis', 'dennis@paddys.com', 'mac', 'mac@paddys.com']
```

### updates

Updating all users in the table to have the same name.

```js
const qb = Update.builder()
	.setTable('users')
	.set('name', 'mac');

const [ stmt, args ] = qb.toSQL();

// stmt: 'UPDATE users SET name = ?'
// args: ['mac']
```

Updating user matching the given predicates.

```js
const qb = Update.builder()
	.setTable('users')
	.set('name', 'mac')
	.whereIsEqual('id', 4)
	.whereIsNotNull('archived_at');

const [ stmt, args ] = qb.toSQL();

// stmt: 'UPDATE users SET name = ? WHERE id = ? AND archived_at IS NOT NULL'
// args: ['mac', 4]
```
