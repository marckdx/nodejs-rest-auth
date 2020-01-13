# Gateway Microservice


![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)


###PRE INSTALL

Change the .env file
```text
PORT=3000
PAGARME_API_KEY=
PAGARME_API_SECRET=
DB_CONNECTION_STRING=
SAVE_CARD_ON_DB=false
```

####Installing

`$ npm install`

####Using

Send a post to:  http://127.0.0.1:3000/api/cards/create

```javascript
{
	"card_holder_name": "JOSE R N SANTOS",
	"amount": 150,
	"card_number": "12345678900",
	"card_expiration_date": "1020",
	"proprietaryId" : "0",
	"card_cvv" : 123
}````
