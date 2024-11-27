package com.jellyone.zadachnik.configuration

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.servers.Server
import io.swagger.v3.oas.annotations.tags.Tag
import io.swagger.v3.oas.annotations.security.SecurityScheme


@OpenAPIDefinition(
    info = Info(
        title = "Information systems course",
        description = "Sample API",
        version = "1.0.0",
    ),
    servers = [
        Server(url = "http://localhost:8080", description = "Default Server URL")
    ],
    tags = [
        Tag(name = "Authorization and Registration", description = "API for users"),
        Tag(name = "User Management", description = "API for users"),
        Tag(name = "Products API", description = "API for products"),
        Tag(name = "Teams API", description = "API for teams"),
        Tag(name = "Tasks API", description = "API for tasks")
    ]
)

@SecurityScheme(
    name = "JWT",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    scheme = "bearer"
)
class SwaggerConfig {

}