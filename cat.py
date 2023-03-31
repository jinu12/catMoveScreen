import sys
from PyQt5.QtCore import Qt, QTimer
from PyQt5.QtGui import QMovie
from PyQt5.QtWidgets import QApplication, QLabel, QWidget, QDesktopWidget
import random


class CatScreensaver(QWidget):
    def __init__(self, num_cats=10, cat_size=(100, 100)):
        super().__init__()

        self.num_cats = num_cats
        self.cat_width, self.cat_height = cat_size

        self.initUI()
        self.initCats()

    def initUI(self):
        self.setWindowTitle('Cat Screensaver')
        self.setWindowFlags(Qt.WindowStaysOnTopHint | Qt.CustomizeWindowHint | Qt.FramelessWindowHint)
        self.setAttribute(Qt.WA_TranslucentBackground)

        desktop = QDesktopWidget()
        self.setGeometry(desktop.geometry())

        self.cats = []

    def initCats(self):
        for i in range(self.num_cats):
            cat = QLabel(self)
            cat.setMovie(QMovie('cat.gif'))
            cat.movie().start()

            cat.setCursor(Qt.PointingHandCursor)

            self.cats.append(cat)

        self.moveCats()

    def moveCats(self):
        for cat in self.cats:
            x = self.getRandomX(cat.width())
            y = self.getRandomY(cat.height())
            cat.move(x, y)

            x_direction = 1 if self.getRandomDirection() else -1
            y_direction = 1 if self.getRandomDirection() else -1

            cat.x_direction = x_direction
            cat.y_direction = y_direction

        self.timer = QTimer()
        self.timer.timeout.connect(self.animateCats)
        self.timer.start(50)

    def animateCats(self):
        for cat in self.cats:
            x = cat.pos().x()
            y = cat.pos().y()

            x += 5 * cat.x_direction
            if x + cat.width() >= self.width():
                x = self.width() - cat.width() - 1
                cat.x_direction *= -1
            elif x <= 0:
                x = 1
                cat.x_direction *= -1
            cat.move(x, y)

            y += 5 * cat.y_direction
            if y + cat.height() >= self.height():
                y = self.height() - cat.height() - 1
                cat.y_direction *= -1
            elif y <= 0:
                y = 1
                cat.y_direction *= -1
            cat.move(x, y)

    def getRandomX(self, width):
        return random.randint(0, self.width() - width)

    def getRandomY(self, height):
        return random.randint(0, self.height() - height)

    def getRandomDirection(self):
        return random.randint(0, 1)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    screensaver = CatScreensaver(num_cats=20, cat_size=(100, 100))
    screensaver.showFullScreen()
    sys.exit(app.exec_())
