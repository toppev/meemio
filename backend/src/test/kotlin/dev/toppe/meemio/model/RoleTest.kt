package dev.toppe.meemio.model

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class RoleTest {

    @Test
    fun toRoleString() {
        // Kinda useless test
        assertEquals("ROLE_USER", Role.USER.toRoleString())
        assertEquals("ROLE_ADMIN", Role.ADMIN.toRoleString())
    }
}