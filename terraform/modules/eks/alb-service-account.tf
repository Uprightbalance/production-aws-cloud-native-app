resource "kubernetes_service_account_v1" "alb_controller" {

  metadata {

    name      = var.alb_controller_service_account_name
    namespace = var.alb_controller_namespace

    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.alb_controller_role.arn
    }
  }
}
