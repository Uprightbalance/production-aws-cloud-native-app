# ---------------------------
# Public Subnets
# ---------------------------

resource "aws_subnet" "public" {
  count = 2

  vpc_id                  = aws_vpc.this.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone       = var.azs[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name                        = "${var.environment}-public-${count.index + 1}"
    "kubernetes.io/role/elb"    = "1"
  }
}

# ---------------------------
# Private Subnets
# ---------------------------

resource "aws_subnet" "private" {
  count = 2

  vpc_id            = aws_vpc.this.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 2)
  availability_zone = var.azs[count.index]

  tags = {
    Name                               = "${var.environment}-private-${count.index + 1}"
    "kubernetes.io/role/internal-elb"   = "1"
  }
}


