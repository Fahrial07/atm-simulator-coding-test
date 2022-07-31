# atm-simulator-coding-test
ATM Simulator - Simulator Bank Retail To Transaction 


## API Reference

#### Register

```http
  POST localhost:8000/users/register
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Login

```http
  POST localhost:8000/users/login
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Get Account

```http
  GET localhost:8000/bank/account?email=
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. |

#### Get All Account

```http
  GET localhost:8000/bank/all
```

#### MOney Deposite

```http
  POST localhost:8000/transaction/deposite
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `account_id` | `Integer` | **Required**. |
| `account_number` | `Integer` | **Required**. |
| `amount` | `Integer` | **Required**. |

#### Money Transfer

```http
  POST localhost:8000/transaction/transfer
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `account_id` | `Integer` | **Required**. |
| `email` | `String` | **Required**. |
| `destination_number` | `Integer` | **Required**. |
| `amount` | `Integer` | **Required**. |

#### Money Widdraw

```http
  POST localhost:8000/transaction/widdraw
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `account_id` | `Integer` | **Required**. |
| `email` | `String` | **Required**. |
| `amount` | `Integer` | **Required**. |



