package com.jellyone.zadachnik

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ZadachnikApplication

fun main(args: Array<String>) {
    runApplication<ZadachnikApplication>(*args)
}