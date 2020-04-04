package dev.toppe.meemio.model

enum class Role {
    USER,
    ADMIN;

    fun toRoleString() = "ROLE_$name"
}