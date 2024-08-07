cd frontend;
echo 'installing dependencies...';
npm install;
echo 'building the app...';
npm run build;
echo 'moving files into required folders...';
mkdir -p ../public/admin;
cp -r build/* ../public/admin;
mv ../public/admin/index.html ../app/view/index/;
