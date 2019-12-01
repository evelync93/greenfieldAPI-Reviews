# Greenfield Reviews API

The goal of this project was to design a system for an existing e-commerce application for the Reviews microservice component, which could handle increased web traffic of at least 100 request per second across 5 endpoints. The relevant endpoints for this API can be found on the bottom of this readme.

The reviews data was generated from 4 CSV files inclusive of over 40 million unique records. 

Due to the nested structure of the endpoints, and ease of adding on additional fields to tables, MongoDB was selected as the database. Docker was used to create an easily horizontally scalable system, and NGINX to support high throughput.

### System Infrastructure
EC2 t2.micro instances running Node server and MongoDB database deployed with Docker

### Results

* Optimizations included implementing indexing, aggregation pipeline operations, and server side pagination to improve query time for a complex lookup required across several endpoints
* The production version of the service is deployed and scaled to 3 AWS EC2 instances (t2.micro) using Docker and NGINX
* The RESTful API implemented for Reviews endpoints achieved 16ms latency and 0% error rate for 1000 RPS

## Table of Contents

  - [Installing-Dependencies](#installing-dependencies)
  - [Technologies-Used](#technologies-used)
  - [Requirements](#requirements)
  - [Routes](#routes)
  - [API](#api)

## Installing-Dependencies

> Navigate to the root directory and run the following scripts to run locally

- `npm install` - install dependencies
- `npm start` - start the server in production

* Navigate to http://localhost:3000/

## Technologies-Used

> Back-End

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com)
- [NGINX](https://www.nginx.com/)

> Testing

- [Artillery](https://artillery.io/)
- [Loader.io](http://loader.io/)

## Requirements

Ensure that the following modules are installed before running `npm install`

- Node v10.13.0 or higher

## Routes

> Listed are available routes that can be handled by the API.

| Request Type | Endpoint                          | Purpose                                                                                                               | Status |
| ------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------ |
| GET          | /reviews/:product_id/list                    | Returns a list of reviews for a particular product. This list does not include any reported reviews | 200    |
| GET          | /reviews/:product_id/meta           | Returns review metadata for a given product                                                             | 200    |
| POST         | /reviews/:product_id                    | Adds a review for the given product                                       | 201    |
| PUT         | /reviews/helpful/:review_id           | Updates a review to show it was found helpful                           | 204    |
| PUT          | /reviews/report/:review_id | Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request                                                              | 204    |


## API

### Use of Parameters
In an HTTP GET request, parameters are sent as a query string:

`http://example.com/page?parameter=value&also=another`

In an HTTP POST or PUT request, the parameters are not sent along with the URI, but in the request body.  Parameters noted for each route below follow this standard.

### List Reviews
Returns a list of reviews for a particular product.  This list *does not* include any reported reviews.
`GET /reviews/:product_id/list`

Parameters

| Parameter  | Type    | Description                                                  |
| ---------- | ------- | ------------------------------------------------------------ |
| product_id | integer | Specifies the product for which to retrieve reviews.         |
| page       | integer | Selects the page of results to return.  Default 1.           |
| count      | integer | Specifies how many results per page to return. Default 5.    |
| sort       | text    | Changes the sort order of reviews to be based on "newest", "helpful", or "relevant" |

Response

`Status: 200 OK `

```json
{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": 0,
      "response": "",
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": 0,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
    // ...
  ]
}
```



### Get Review Metadata

Returns review metadata for a given product.

`GET /reviews/:product_id/meta`

Parameters

| Parameter  | Type    | Description                                                  |
| ---------- | ------- | ------------------------------------------------------------ |
| product_id | integer | Required ID of the product for which data should be returned |

Response

`Status: 200 OK `

```json
{
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  "recommended": {
    0: 5
    // ...
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
    // ...
}
```



### Add a Review

Adds a review for the given product.

`POST /reviews/:product_id`

Parameters

| Parameter  | Type    | Description                                       |
| ---------- | ------- | ------------------------------------------------- |
| product_id | integer | Required ID of the product to post the review for |

Body Parameters

| Parameter       | Type   | Description                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| rating          | int    | Integer (1-5) indicating the review rating                   |
| summary         | text   | Summary text of the review                                   |
| body            | text   | Continued or full text of the review                         |
| recommend       | bool   | Value indicating if the reviewer recommends the product      |
| name            | text   | Username for question asker                                  |
| email           | text   | Email address for question asker                             |
| photos          | [text] | Array of text urls that link to images to be shown           |
| characteristics | object | Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}|

Response

`Status: 201 CREATED `

### Mark Review as Helpful

Updates a review to show it was found helpful.

`PUT /reviews/helpful/:review_id`

Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| reveiw_id | integer | Required ID of the review to update |

Response

`Status: 204 NO CONTENT `



### Report Review

Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.

`PUT /reviews/report/:review_id`

Parameters

| Parameter | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| review_id | integer | Required ID of the review to update |

Response

`Status: 204 NO CONTENT `