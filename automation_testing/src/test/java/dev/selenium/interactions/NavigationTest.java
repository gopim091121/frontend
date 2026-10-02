package dev.selenium.interactions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.Edge.EdgeDriver;

public class NavigationTest {
    public static void main(String[] args) {
        new NavigationTest().navigateBrowser();
    }

    @Test
    public void navigateBrowser() {
        WebDriver driver = new EdgeDriver();

        try {
            driver.get("https://www.selenium.dev/");
            assertEquals("Selenium", driver.getTitle());

            driver.navigate().to("https://www.selenium.dev/documentation/webdriver/");
            assertTrue(driver.getTitle().contains("WebDriver"));

            driver.navigate().back();
            assertEquals("Selenium", driver.getTitle());

            driver.navigate().forward();
            assertTrue(driver.getTitle().contains("WebDriver"));

            driver.navigate().refresh();
            assertTrue(driver.getCurrentUrl().contains("documentation/webdriver"));
        } finally {
            driver.quit();
        }
    }
}
