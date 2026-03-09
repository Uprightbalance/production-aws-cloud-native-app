terraform {
  backend "s3" {
    bucket         = "cloud-gitops-terraform-state"
    key            = "Dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
