DEP_FILE := .deps.d
LATEXMK_FLAGS := -pdf --shell-escape -pdflatex="pdflatex -interaction=nonstopmode" \
								 -use-make \
								 -M -MF $(DEP_FILE)

D2_FLAGS := --layout elk

.PHONY: clean format pvc spell


all: main.pdf

main.pdf: main.tex
	latexmk $(LATEXMK_FLAGS) $<

pvc: main.tex
	latexmk $(LATEXMK_FLAGS) -pvc $<

clean:
	rm -rf $(DEP_FILE) main.pdf **/*.bak* src/**/*.bak* *.bbl *.nav *.run.xml *.snm **/*.log src/*/*.log __pycache__ _minted-main figures/*.png
	latexmk -C main.tex 

format:
	latexindent src/*.tex -w
	rm -rf src/*.bak*

spell:
	hunspell -d ru_RU,en_US -l -t src/**/*.tex src/*.tex main.tex

figures/%.png: figures/%.d2
	d2 $(D2_FLAGS) $< $@

$(DEP_FILE):
	touch $@

-include $(DEP_FILE)
