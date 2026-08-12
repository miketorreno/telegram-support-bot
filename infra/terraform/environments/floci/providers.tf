provider "aws" {
  region = var.aws_region

  access_key = "test"
  secret_key = "test"

  endpoints {
    ec2 = var.floci_endpoint
  }

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
      Provider    = "floci"
    }
  }
}
