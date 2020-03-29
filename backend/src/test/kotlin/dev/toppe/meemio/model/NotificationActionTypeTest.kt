package dev.toppe.meemio.model

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class NotificationActionTypeTest {

    @Test
    fun toValueHasNotChanged() {
        assertEquals(0, NotificationActionType.NONE.toValue())
        assertEquals(1, NotificationActionType.PROFILE.toValue())
        assertEquals(2, NotificationActionType.POST.toValue())
    }
}