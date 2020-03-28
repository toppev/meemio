package dev.toppe.meemio.model

import com.fasterxml.jackson.annotation.JsonValue
import javax.persistence.*

@Embeddable
data class Notification(
        var message: String,
        var type: NotificationActionType,
        var refId: Long = 0,
        var hasRead: Boolean = false
)

enum class NotificationActionType {

    // DO NOT CHANGE THE ORDER!!!
    NONE,
    PROFILE,
    POST;

    @JsonValue
    fun toValue() = ordinal

}