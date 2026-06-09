# Print important URLs

output "ecr_repository_url" {
  description = "The URL of the ECR repository. You will push your Docker image here."
  value       = aws_ecr_repository.app.repository_url
}

output "secret_arn" {
  description = "The ARN of the Secrets Manager secret."
  value       = aws_secretsmanager_secret.app_env.arn
}

output "iam_instance_role_arn" {
  description = "The ARN of the IAM role for the running app."
  value       = aws_iam_role.apprunner_instance.arn
}