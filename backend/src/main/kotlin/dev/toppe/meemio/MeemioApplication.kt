package dev.toppe.meemio

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MeemioApplication

fun main(args: Array<String>) {
    runApplication<MeemioApplication>(*args)
}
