provider "aws" {
  region = "us-west-2"
}

variable "environment" {
  default = "sandbox"
}

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucketclala123131-f3-${var.environment}"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}