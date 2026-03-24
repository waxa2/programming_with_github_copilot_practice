CC = gcc
CFLAGS = -Wall -Wextra -I./src/utils
SRC = src/main.c src/utils/helpers.c
OBJ = $(SRC:.c=.o)
TARGET = pirates_example

all: $(TARGET)

$(TARGET): $(OBJ)
	$(CC) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJ) $(TARGET)

.PHONY: all clean