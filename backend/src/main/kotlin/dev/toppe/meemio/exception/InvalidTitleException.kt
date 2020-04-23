package dev.toppe.meemio.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
open class InvalidTitleException(message: String?) : RuntimeException(message)