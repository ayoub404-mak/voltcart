#(Security Permissions)

# 1. Access Role (Allows App Runner to pull from ECR)
resource "aws_iam_role" "apprunner_access" {
  name = "${var.project_name}-apprunner-access-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "build.apprunner.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "apprunner_access" {
  role       = aws_iam_role.apprunner_access.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}

# 2. Instance Role (Allows the running container to read Secrets)
resource "aws_iam_role" "apprunner_instance" {
  name = "${var.project_name}-apprunner-instance-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "tasks.apprunner.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "apprunner_instance_secrets" {
  name = "${var.project_name}-instance-secrets-${var.environment}"
  role = aws_iam_role.apprunner_instance.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = [
        "secretsmanager:GetSecretValue",
        "kms:Decrypt*"
      ]
      Resource = [aws_secretsmanager_secret.app_env.arn]
    }]
  })
}