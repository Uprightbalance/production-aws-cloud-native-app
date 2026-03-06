data "aws_iam_policy_document" "alb_assume_role" {

  statement {

    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type = "Federated"

      identifiers = [
        aws_iam_openid_connect_provider.eks.arn
      ]
    }

    condition {

      test = "StringEquals"

      variable = "${replace(aws_iam_openid_connect_provider.eks.url, "https://", "")}:sub"

      values = [
        "system:serviceaccount:${var.alb_controller_namespace}:${var.alb_controller_service_account_name}"
      ]
    }
  }
}

resource "aws_iam_role" "alb_controller_role" {

  name = "${var.cluster_name}-alb-controller-role"

  assume_role_policy = data.aws_iam_policy_document.alb_assume_role.json
}
