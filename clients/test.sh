cd schema
for dr in *
do
	cd $dr
	echo "  \"${dr}\": {"
	for file in *.json
	do
		atrs=${file%.json}
		echo "    \"${atrs#${dr}.}\": \"user_data/schema/${dr}/${file}\","
	done
	echo "  },"
	cd -
done
cd -
