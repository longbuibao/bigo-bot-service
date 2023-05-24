# Command

### Create VM based on number of views

```sh
curl -X POST -H "Content-Type: application/json" -d '{
    "idolUrl": "https://example.com/idol-image.jpg",
    "viewAmount": 100,
    "imageId": "ami-0ebabb8cf39198221",
    "instanceType": "t2.micro",
    "region": "us-east-1"
}' localhost:3000/create-ec2-instance

```