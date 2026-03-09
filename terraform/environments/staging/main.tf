module "vpc" {
  source      = "../../modules/vpc"
  environment = "staging"
  
  azs = ["us-east-1a", "us-east-1b"]
}

module "eks" {
  source          = "../../modules/eks"
  cluster_name    = "staging-cluster"
  private_subnets = module.vpc.private_subnet_ids
  vpc_id          = module.vpc.vpc_id
  aws_region      = "us-east-1"
}

module "rds" {
  source      = "../../modules/rds"
  environment = "staging"

  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnet_ids
  vpc_cidr        = module.vpc.vpc_cidr
}
