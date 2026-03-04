module "vpc" {
  source      = "../../modules/vpc"
  environment = "staging"
}
