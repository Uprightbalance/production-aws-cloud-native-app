# ---------------------------
# Elastic IP for NAT
# ---------------------------

resource "aws_eip" "nat" {
  domain = "vpc"
}

