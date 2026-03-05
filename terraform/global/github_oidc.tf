module "github_oidc" {
  source = "../modules/github_oidc"

  github_repo = "Uprightbalance/production-aws-cloud-native-app"

  role_name = "github-ci-role"

  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}
