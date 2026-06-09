# (The Secure Vault)
# We create the "shell" of the secret in Terraform.
# WE DO NOT put the actual passwords here. We will paste them securely via the AWS Console.
resource "aws_secretsmanager_secret" "app_env" {
  name = "${var.project_name}/${var.environment}/app-env"
}